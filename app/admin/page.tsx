import Image from 'next/image'
import Link from 'next/link'

import AdminShell from '@/app/admin/admin-shell'
import { requireAdminUser } from '@/app/admin/lib'
import { deletePortfolioProjectAction } from '@/app/admin/portfolio/actions'
import { getPortfolioProjects, getPortfolioSyncStatus } from '@/app/lib/portfolio-projects'

const projectStatuses = ['ACTIVE', 'STAGING', 'INTERNAL', 'ACTIVE'] as const

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const user = await requireAdminUser()
  const projects = await getPortfolioProjects()
  const syncStatus = await getPortfolioSyncStatus()

  return (
    <AdminShell activeNav="dashboard" email={user.email}>
      <section className="space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic text-black">
              ADMIN COMMAND CENTER
            </h1>
            <p className="text-sm font-bold uppercase text-secondary mt-1">
              SYSTEM STATUS: <span className="text-primary underline">OPERATIONAL</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH SYSTEM..."
                className="w-72 rounded-none border-4 border-black bg-white px-10 py-2 font-bold outline-none focus:bg-[#ffd600]"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black font-bold">🔍</span>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <Link href="#" className="text-black underline decoration-4 font-bold uppercase tracking-tighter">
                Overview
              </Link>
              <Link href="#" className="text-black font-bold uppercase tracking-tighter hover:bg-[#ffd600] px-2">
                Analytics
              </Link>
              <Link href="#" className="text-black font-bold uppercase tracking-tighter hover:bg-[#ffd600] px-2">
                Nodes
              </Link>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black uppercase text-xs tracking-widest text-secondary">TOTAL LEADS</p>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-4xl font-black">1,284</span>
              <span className="text-green-600 font-bold">+12%</span>
            </div>
          </div>
          <div className="border-4 border-black bg-[#ffd600] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black uppercase text-xs tracking-widest text-black">LEADS TODAY</p>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-4xl font-black">42</span>
              <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">NEW PEAK</span>
            </div>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black uppercase text-xs tracking-widest text-secondary">CONVERSION RATE</p>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-4xl font-black">24.8%</span>
              <span className="text-4xl">📈</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-3">
          <section className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black uppercase">Active Leads Pipeline</h2>
              <button className="rounded-none border-2 border-black bg-black px-4 py-2 text-sm font-bold uppercase text-white hover:bg-[#ffd600] hover:text-black">
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
              <table className="min-w-full border-collapse">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border-3 border-black p-4 text-left text-xs font-black uppercase">Client Name</th>
                    <th className="border-3 border-black p-4 text-left text-xs font-black uppercase">Service</th>
                    <th className="border-3 border-black p-4 text-left text-xs font-black uppercase">Status</th>
                    <th className="border-3 border-black p-4 text-left text-xs font-black uppercase">Date</th>
                    <th className="border-3 border-black p-4 text-left text-xs font-black uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-bold">
                  <tr>
                    <td className="border-3 border-black p-4">Global Dynamics</td>
                    <td className="border-3 border-black p-4">AI Infrastructure</td>
                    <td className="border-3 border-black p-4"><span className="bg-[#ffd600] border-2 border-black px-3 py-1 text-xs uppercase font-black">New</span></td>
                    <td className="border-3 border-black p-4">OCT 24, 2023</td>
                    <td className="border-3 border-black p-4 flex gap-2"><button className="text-sm font-black">👁</button><button className="text-sm font-black">✎</button></td>
                  </tr>
                  <tr>
                    <td className="border-3 border-black p-4">Nova Soft</td>
                    <td className="border-3 border-black p-4">Cloud Migration</td>
                    <td className="border-3 border-black p-4"><span className="bg-blue-500 text-white border-2 border-black px-3 py-1 text-xs uppercase font-black">Contacted</span></td>
                    <td className="border-3 border-black p-4">OCT 23, 2023</td>
                    <td className="border-3 border-black p-4 flex gap-2"><button className="text-sm font-black">👁</button><button className="text-sm font-black">✎</button></td>
                  </tr>
                  <tr>
                    <td className="border-3 border-black p-4">Apex Systems</td>
                    <td className="border-3 border-black p-4">Cyber Audit</td>
                    <td className="border-3 border-black p-4"><span className="bg-green-500 text-white border-2 border-black px-3 py-1 text-xs uppercase font-black">Deal</span></td>
                    <td className="border-3 border-black p-4">OCT 22, 2023</td>
                    <td className="border-3 border-black p-4 flex gap-2"><button className="text-sm font-black">👁</button><button className="text-sm font-black">✎</button></td>
                  </tr>
                  <tr>
                    <td className="border-3 border-black p-4">ByteCorp</td>
                    <td className="border-3 border-black p-4">Edge Computing</td>
                    <td className="border-3 border-black p-4"><span className="bg-red-500 text-white border-2 border-black px-3 py-1 text-xs uppercase font-black">Lost</span></td>
                    <td className="border-3 border-black p-4">OCT 21, 2023</td>
                    <td className="border-3 border-black p-4 flex gap-2"><button className="text-sm font-black">👁</button><button className="text-sm font-black">✎</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="mb-4 text-xl font-black uppercase border-b-4 border-black pb-2">Infrastructure</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-xs font-black uppercase">
                    <span>Server Load</span>
                    <span>78%</span>
                  </div>
                  <div className="h-6 w-full border-4 border-black bg-slate-200">
                    <div className="h-full w-[78%] bg-[#ffd600] border-r-4 border-black"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs font-black uppercase">
                    <span>Memory Usage</span>
                    <span>45%</span>
                  </div>
                  <div className="h-6 w-full border-4 border-black bg-slate-200">
                    <div className="h-full w-[45%] bg-[#ffd600] border-r-4 border-black"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs font-black uppercase">
                    <span>Disk Space</span>
                    <span>92%</span>
                  </div>
                  <div className="h-6 w-full border-4 border-black bg-slate-200">
                    <div className="h-full w-[92%] bg-red-500 border-r-4 border-black"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-4 border-black bg-black p-6 text-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-3 flex items-center justify-between border-b border-yellow-400/30 pb-2">
                <span className="font-bold">SYSTEM_LOGS_V2.0</span>
                <span className="animate-pulse">● LIVE</span>
              </div>
              <div className="max-h-48 space-y-1 overflow-y-auto text-xs font-mono">
                <p className="opacity-80">[10:24:01] INCOMING_LEAD: GLOBAL DYNAMICS</p>
                <p className="opacity-80">[10:22:45] NODE_04_SYNC_SUCCESS</p>
                <p className="text-red-500">[10:20:12] DISK_SPACE_CRITICAL: 92%</p>
                <p className="opacity-80">[10:15:33] AUTH_TOKEN_REFRESHED</p>
                <p className="opacity-80">[10:12:01] DB_QUERY_OPTIMIZED</p>
                <p className="opacity-80">[10:08:44] REVENUE_SYNC_COMPLETE</p>
              </div>
              <div className="mt-2 border-t border-yellow-400/30 pt-2 text-xs">
                <button className="font-bold hover:underline">View Full Log Cluster</button>
              </div>
            </div>
          </aside>
        </div>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="border-4 border-black bg-white p-6 hover:bg-slate-50 transition-colors">
            <h4 className="mb-2 text-lg font-black uppercase">Active Users</h4>
            <p className="text-3xl font-black">2.4k</p>
          </div>
          <div className="border-4 border-black bg-white p-6 hover:bg-slate-50 transition-colors">
            <h4 className="mb-2 text-lg font-black uppercase">Open Tickets</h4>
            <p className="text-3xl font-black">14</p>
          </div>
          <div className="border-4 border-black bg-white p-6 hover:bg-slate-50 transition-colors">
            <h4 className="mb-2 text-lg font-black uppercase">Avg Response</h4>
            <p className="text-3xl font-black">1.2s</p>
          </div>
          <div className="border-4 border-black bg-[#ffd600] p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="mb-2 text-lg font-black uppercase">Security</h4>
            <p className="text-3xl font-black">FIREWALL: ON</p>
          </div>
        </section>

        <footer className="mt-8 border-t-4 border-black pt-6">
          <div className="flex flex-col gap-3 text-xs font-black uppercase md:flex-row md:items-center md:justify-between">
            <div>© 2026 YUNAKA TECH ARCHITECTURE</div>
            <div className="flex flex-wrap gap-4">
              <Link href="#" className="hover:underline">Documentation</Link>
              <Link href="#" className="hover:underline">API Reference</Link>
              <Link href="#" className="hover:underline">System Health</Link>
            </div>
          </div>
        </footer>
      </section>
    </AdminShell>
  )
}
