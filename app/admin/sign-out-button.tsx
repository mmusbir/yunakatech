import { signOutAction } from '@/app/login/actions'

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="border-[3px] border-black bg-white px-5 py-2 text-sm font-black uppercase tracking-[-0.04em] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
      >
        Logout
      </button>
    </form>
  )
}
