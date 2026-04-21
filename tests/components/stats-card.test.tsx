import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatsCard } from '@/components/dashboard/stats-card'
import { Anchor } from 'lucide-react'

describe('StatsCard Component', () => {
  it('renders title and value correctly', () => {
    render(
      <StatsCard 
        title="Total Berths" 
        value={150} 
        icon={Anchor} 
      />
    )
    expect(screen.getByText('Total Berths')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument()
  })

  it('renders positive change correctly', () => {
    render(
      <StatsCard 
        title="Revenue" 
        value="$5000" 
        change="+10% from last month" 
        changeType="positive" 
        icon={Anchor} 
      />
    )
    const changeElement = screen.getByText('+10% from last month')
    expect(changeElement).toBeInTheDocument()
    expect(changeElement).toHaveClass('text-emerald-600')
  })
})
