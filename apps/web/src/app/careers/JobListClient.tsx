'use client';

import { useState } from 'react';
import { JobCard } from '@/components/molecules';
import { CategoryFilter } from '@/components/molecules';
import { Text } from '@/components/atoms';

interface JobSummary {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
}

interface JobListClientProps {
  jobs: JobSummary[];
  departments: string[];
}

export function JobListClient({ jobs, departments }: JobListClientProps) {
  const [activeDept, setActiveDept] = useState('All');

  const categoryOptions = [
    { label: 'All', value: 'All' },
    ...departments.map((d) => ({ label: d, value: d })),
  ];

  const filtered =
    activeDept === 'All'
      ? jobs
      : jobs.filter((j) => j.department === activeDept);

  return (
    <section className="container-content section-padding">
      <CategoryFilter
        categories={categoryOptions}
        active={activeDept}
        onChange={setActiveDept}
        className="mb-10"
      />

      {filtered.length === 0 ? (
        <Text variant="body" className="py-16 text-center text-gray-500">
          No open positions in this department right now.
        </Text>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              department={job.department}
              location={job.location}
              type={job.type}
              href={`/careers/${job.slug}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
