
import Mainpage from "./_components/Mainpage";

export default function ApartmentsPage({ searchParams }: { searchParams: { q?: string } }) {
  return <Mainpage query={searchParams.q || ''} />;
}


