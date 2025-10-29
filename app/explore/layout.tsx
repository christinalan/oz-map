import MapViewClient from '../components/MapViewClient';

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MapViewClient />
      {children}
    </>
  );
} 