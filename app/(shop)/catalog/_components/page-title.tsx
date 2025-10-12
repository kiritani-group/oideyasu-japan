export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="my-10 text-center">
      <div className="border-foreground/40 mb-2 inline-block border-b-1 pb-2">
        <h1 className="text-foreground text-[clamp(1.5rem,4cqw,2.5rem)] tracking-wider">
          お取り寄せ - 通販くらぶ
        </h1>
      </div>
      <p className="text-muted-foreground mx-auto text-[clamp(1.5rem,3cqw,2rem)] leading-relaxed">
        {title}
      </p>
    </div>
  )
}
