import Link from "next/link";

export default function Home() {
  return (
    <div className="dashboard-body">
        <div className="dashboard-container">
            <h1>Web Directory</h1>
            <div className="button-grid">
                <Link href="/fakeWeb1" className="nav-button">Website 1</Link>
                <Link href="/fakeWeb2" className="nav-button">Website 2</Link>
                <Link href="/fakeWeb3" className="nav-button">Website 3</Link>
                <Link href="/fakeWeb4" className="nav-button">Website 4</Link>
                <Link href="/fakeWeb5" className="nav-button">Website 5</Link>
                <Link href="/fakeWeb6" className="nav-button">Website 6</Link>
            </div>
        </div>
    </div>
  );
}
