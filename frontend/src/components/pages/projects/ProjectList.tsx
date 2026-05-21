import React from 'react';
import ProjectItem from './ProjectItem';
import type { Project } from '@/types/project';

interface ProjectListProps {
    filteredProjects: Project[];

}
const ProjectList: React.FC<ProjectListProps> = ({
    filteredProjects,
}) => (
    <>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectItem key={project.id} project={project}/>
        ))}
      </div>
    </>
);

export default ProjectList;