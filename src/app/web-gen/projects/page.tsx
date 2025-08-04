'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSimpleAuth } from '@/contexts/SimpleAuthContext';
import { WebGenProject } from '@/lib/web-gen-service';
import Link from 'next/link';
import Image from 'next/image';

export default function WebGenProjects() {
  const { user, isAuthenticated, isLoading } = useSimpleAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<WebGenProject[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Load user's projects
    const loadProjects = async () => {
      if (user) {
        setIsLoadingProjects(true);
        try {
          const response = await fetch(`/api/web-gen?userId=${user.id}`, {
            method: 'GET',
          });
          
          if (!response.ok) {
            throw new Error('Failed to load projects');
          }
          
          const data = await response.json();
          setProjects(data.projects || []);
        } catch (error) {
          console.error('Error loading projects:', error);
        } finally {
          setIsLoadingProjects(false);
        }
      }
    };

    if (user) {
      loadProjects();
    }
  }, [user]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newProjectName.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch('/api/web-gen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          project: {
            name: newProjectName.trim(),
            description: newProjectDescription.trim(),
            user_id: user.id,
            is_published: false
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const data = await response.json();
      const newProject = data.project;

      if (newProject) {
        setProjects([newProject, ...projects]);
        setNewProjectName('');
        setNewProjectDescription('');
        setShowCreateForm(false);
        // Navigate to the editor for the new project
        router.push(`/web-gen/editor/${newProject.id}`);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        const response = await fetch('/api/web-gen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'delete',
            projectId
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete project');
        }

        const data = await response.json();
        if (data.success) {
          setProjects(projects.filter(p => p.id !== projectId));
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Web Projects</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Web Projects</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          {showCreateForm ? 'Cancel' : 'Create New Project'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="My Awesome Website"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <textarea
                id="projectDescription"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                placeholder="Brief description of your website"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isCreating || !newProjectName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Creating...' : 'Create & Edit'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoadingProjects ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                {project.thumbnail ? (
                  <img 
                    src={project.thumbnail} 
                    alt={project.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="text-gray-400 text-center p-4">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    No Preview
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Last edited: {new Date(project.last_edited_at || project.updated_at || '').toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Link 
                    href={`/web-gen/editor/${project.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-3 rounded transition duration-200"
                  >
                    Edit
                  </Link>
                  {project.is_published && (
                    <Link 
                      href={project.published_url || '#'}
                      target="_blank"
                      className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-1.5 px-3 rounded transition duration-200"
                    >
                      View Live
                    </Link>
                  )}
                  <button
                    onClick={() => handleDeleteProject(project.id!)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-gray-600 mb-4">Create your first web project to get started</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Create New Project
          </button>
        </div>
      )}
    </div>
  );
}