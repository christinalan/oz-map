import MapViewClient from '../components/MapViewClient';

export default function ExploreLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <MapViewClient />
      {children}
      {modal}
    </>
  );
} 