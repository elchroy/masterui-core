
export default function ErrorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4 md:p-6 lg:p-8">
      {children}
    </div>
  )
}
