type ErrorProps = {
    children: string
}

export default function Error({children} : ErrorProps) {
  return (
    <p className="bg-red-500 text-white text-lg text-center font-bold uppercase p-2">{children}</p>
  )
}