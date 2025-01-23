import LeaguePage from '@/app/components/LeaguePage'

export default function DynamicLeaguePage({ params }: { params: { type: string, league: string } }) {
  const { type, league } = params
  const leagueName = league.toUpperCase()

  return <LeaguePage leagueName={leagueName} />
}
