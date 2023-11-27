export default function Loading(): JSX.Element {
  return (
    <div className="z-2 absolute top-[50%] left-[50%] animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-slate-600 rounded-full dark:text-slate-300">
      <span className="sr-only">loading...</span>
    </div>
  )
}
