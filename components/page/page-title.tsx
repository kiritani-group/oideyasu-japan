export default function PageTitle({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) {
  return (
    <div className="my-10 px-4 text-center">
      <div className="border-foreground/40 mb-2 inline-block border-b pb-2">
        <h1 className="text-muted-foreground text-[clamp(1.5rem,3.5vw,2.5rem)] tracking-wider">
          {title}
        </h1>
      </div>
      <p className="text-foreground mx-auto text-[clamp(1.5rem,2.5vw,2rem)] leading-relaxed text-pretty">
        {subTitle}
      </p>
    </div>
  )
}
