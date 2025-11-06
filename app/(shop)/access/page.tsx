import PageTitle from "@/components/page/page-title"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Clock, House, MapPin, Phone, PhoneOutgoing } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "アクセス・お問い合わせ",
}

export default function Page() {
  return (
    <>
      <PageTitle
        title="アクセス・お問い合わせ"
        subTitle="お気軽にお電話ください"
      />
      <div className="mx-2 my-10 opacity-100 transition-all duration-1000 @xl:mx-4 starting:translate-y-3 starting:opacity-0">
        <Card className="grid gap-0 py-0 @3xl:grid-cols-2">
          <CardContent className="p-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4560.071547574817!2d136.1958461259587!3d36.082333801430785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8bf0c097f0c4d%3A0xe734f4b3a43642d7!2z44GK44GE44Gn5bq3IOaXrOiPnOmurumtmuOBqOeCreeBq-eEvA!5e0!3m2!1sja!2sjp!4v1761910908346!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: "400px",
                borderRadius: "10px",
                backgroundColor: "#EBEBEB",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </CardContent>
          <div className="m-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                <House className="text-primary size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-card-foreground mb-1 font-medium">
                  店舗名
                </h3>
                <p className="text-muted-foreground">
                  旬菜鮮魚と炭火焼 おいで康
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Phone className="text-primary size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-card-foreground mb-1 font-medium">
                  電話番号
                </h3>
                <a
                  href="tel:0776-28-0828"
                  className="text-muted-foreground hover:text-primary flex items-center gap-1.5 underline transition-colors"
                >
                  0776-28-0828
                  <span>
                    <PhoneOutgoing className="size-4 md:hidden" />
                  </span>
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                <MapPin className="text-primary size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-card-foreground mb-1 font-medium">住所</h3>
                <p className="text-muted-foreground">
                  〒910-0032
                  <br />
                  福井県福井市堀ノ宮1-325
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Clock className="text-primary size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-card-foreground mb-1 font-medium">
                  営業時間
                </h3>
                <div className="text-muted-foreground space-y-1">
                  <p>平日: ▲▲:00 - ▲▲:00</p>
                  <p>土日祝: ▲▲:00 - ▲▲:00</p>
                  <p className="text-destructive/75">定休日: 毎週月曜日</p>
                </div>
              </div>
            </div>

            {/* Parking */}
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Car className="text-primary size-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-card-foreground mb-1 font-medium">
                  駐車場
                </h3>
                <p className="text-muted-foreground">
                  専用駐車場あり
                  <br />
                  <span className="flex gap-0.5 text-sm">
                    <span>※</span>
                    店舗前が満車の場合は、別の駐車場をご案内しますので、スタッフまでお声掛けくださいませ
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
