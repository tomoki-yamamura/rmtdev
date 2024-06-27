
export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="sidebar">
      {children}
    </div>
  );
}

export function SideBarTop({ children }: { children: React.ReactNode }) {
  return <div className="sidebar__top">
    {children}
  </div>
}