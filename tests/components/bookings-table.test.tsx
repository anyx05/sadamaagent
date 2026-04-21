import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BookingsTable } from '../../components/dashboard/bookings-table'

// Mock the queries
vi.mock('@/lib/queries/bookings', () => ({
  useBookings: vi.fn()
}))

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

import { useBookings } from '@/lib/queries/bookings'

describe('BookingsTable Component', () => {
  it('renders loading skeleton when isLoading is true', () => {
    vi.mocked(useBookings).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null
    } as any)

    const { container } = render(<BookingsTable />)
    
    // The skeleton creates empty divs with animate-pulse
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders empty state when there are no bookings', () => {
    vi.mocked(useBookings).mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    } as any)

    render(<BookingsTable />)
    
    // t("empty") key is used which returns "empty" due to our mock
    expect(screen.getByText('empty')).toBeDefined()
  })

  it('renders a list of recent bookings with correct statuses', () => {
    const mockBookings = [
      {
        id: '1',
        customerName: 'Captain Haddock',
        vessel: 'Sirius',
        arrival: '2023-10-01T12:00:00Z',
        departure: '2023-10-05T12:00:00Z',
        status: 'confirmed'
      },
      {
        id: '2',
        customerName: 'Captain Hook',
        vessel: 'Jolly Roger',
        arrival: '2023-10-10T12:00:00Z',
        departure: '2023-10-12T12:00:00Z',
        status: 'pending'
      }
    ]

    vi.mocked(useBookings).mockReturnValue({
      data: mockBookings,
      isLoading: false,
      error: null
    } as any)

    render(<BookingsTable />)

    expect(screen.getByText('Captain Haddock')).toBeDefined()
    expect(screen.getByText('Sirius')).toBeDefined()
    expect(screen.getByText('Captain Hook')).toBeDefined()
    expect(screen.getByText('Jolly Roger')).toBeDefined()

    // Status translations will just return the translation key
    expect(screen.getByText('confirmed')).toBeDefined()
    expect(screen.getByText('pending')).toBeDefined()
  })

  it('limits to 5 recent bookings on the dashboard', () => {
    const mockBookings = Array.from({ length: 10 }).map((_, i) => ({
      id: `${i}`,
      customerName: `Customer ${i}`,
      vessel: `Vessel ${i}`,
      arrival: '2023-10-01T12:00:00Z',
      departure: '2023-10-05T12:00:00Z',
      status: 'confirmed'
    }))

    vi.mocked(useBookings).mockReturnValue({
      data: mockBookings,
      isLoading: false,
      error: null
    } as any)

    render(<BookingsTable />)

    // Should only render up to Customer 4 (0-indexed)
    expect(screen.getByText('Customer 0')).toBeDefined()
    expect(screen.getByText('Customer 4')).toBeDefined()
    
    // Should NOT render Customer 5
    expect(screen.queryByText('Customer 5')).toBeNull()
  })
})
