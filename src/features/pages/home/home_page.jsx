import { useHome } from './hooks/useHome.js'
import { Header } from './components/Header/header.jsx'
import { DashboardCharts } from './components/Charts/dashboard_charts.jsx'

export function HomePage() {
  const { stats, loading, error } = useHome()

  // div y no main: MainPage ya aporta el <main> de la página.
  return (
    <div>
      <Header stats={stats} loading={loading} error={error} />
      {!error && <DashboardCharts stats={stats} loading={loading} />}
    </div>
  )
}
