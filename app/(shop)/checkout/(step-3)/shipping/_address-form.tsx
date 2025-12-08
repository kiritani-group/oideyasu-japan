import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { normalizePhoneNumber } from "@/lib/utils/nomalize-phone-number"
import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import type { ActionState } from "./_action"
import type { AddressWithoutNull, Person } from "./_types"
import { useZipLookup } from "./_use-zip-lookup"

type AddressFieldDefObj = {
  key: keyof AddressWithoutNull
  label: string
  handler?: (e: ChangeEvent<HTMLInputElement>) => void
  defaultHint?: string
}

export default function AddressForm({
  title,
  isGift,
  person,
  setPerson,
  state,
}: {
  title: string
  isGift?: boolean
  person: Person
  setPerson: Dispatch<SetStateAction<Person>>
  state: ActionState
}) {
  const update = (key: keyof Person, value: any) => {
    setPerson((prev) => ({ ...prev, [key]: value }))
  }
  const updateAddress = <K extends keyof AddressWithoutNull>(
    key: K,
    value: AddressWithoutNull[K],
  ) => {
    setPerson((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [key]: value,
      },
    }))
  }
  const normalizeZenToHan = (str: string): string => {
    return (
      str
        // 全角スペース → 半角スペース
        .replace(/\u3000/g, " ")
        // 全角数字 → 半角数字
        .replace(/[０-９]/g, (s) =>
          String.fromCharCode(s.charCodeAt(0) - 0xfee0),
        )
        // 全角ハイフン → 半角ハイフン
        .replace(/[－―ー]/g, "-")
    )
  }

  const { addressOptions, dialogOpen, setDialogOpen, lookupAddress } =
    useZipLookup((addr) => {
      updateAddress("prefectureCode", addr.prefectureCode)
      updateAddress("prefecture", addr.prefecture)
      updateAddress("city", addr.city)
      updateAddress("town", addr.town)
    })

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const postalCode = e.target.value
      .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
      .replace(/[^0-9]/g, "")
      .slice(0, 7)
    updateAddress("postalCode", postalCode)
    lookupAddress(postalCode)
  }

  const addressFieldDefs: AddressFieldDefObj[] = [
    {
      key: "postalCode",
      label: "郵便番号",
      handler: handleZipChange,
    },
    {
      key: "prefecture",
      label: "都道府県",
      defaultHint:
        "郵便番号を入力すると自動で入力されます。手動では入力できません。",
    },
    { key: "city", label: "市区郡町村" },
    { key: "town", label: "町域" },
    { key: "streetAddress", label: "番地など" },
    {
      key: "building",
      label: "建物名・部屋番号",
    },
  ]

  const renderAddressField = ({
    key,
    label,
    defaultHint,
    handler,
  }: AddressFieldDefObj) => {
    const group = isGift ? "recipientAddress" : "buyerAddress"
    const msg =
      state.type === "ERROR" && state.errors?.[group]?.[key]?.[0]
        ? state.errors[group][key][0]
        : null
    return (
      <div key={key} className="space-y-2">
        <Label htmlFor={buildId(key, isGift)}>{label}</Label>
        <Input
          id={buildId(key, isGift)}
          type="text"
          disabled={key === "prefecture"}
          aria-invalid={
            key !== "prefecture" &&
            state.type === "ERROR" &&
            !!state.errors?.[group]?.[key]?.[0]
          }
          value={person.address[key]}
          onChange={
            handler
              ? handler
              : (e) => updateAddress(key, normalizeZenToHan(e.target.value))
          }
          className="aria-invalid:text-foreground"
        />
        {msg && key !== "prefecture" ? (
          <p className="text-destructive -mt-1 text-sm">{msg}</p>
        ) : defaultHint ? (
          <p className="text-muted-foreground -mt-1 text-sm">{defaultHint}</p>
        ) : null}
      </div>
    )
  }

  const buildId = (base: string, forGift?: boolean) =>
    forGift ? `${base}-ForGift` : base
  return (
    <div className="space-y-2">
      <h2 className="text-md font-bold underline underline-offset-2">
        {title}
      </h2>
      <div className="ml-2 space-y-4 border-l py-2 pl-3">
        {isGift && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="lastName">姓(上のお名前)</Label>
                <Input
                  id="lastName"
                  placeholder="山田"
                  aria-invalid={
                    state.type === "ERROR" &&
                    !!state.errors?.recipient?.lastName
                  }
                  value={person.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
                {state.type === "ERROR" &&
                  state.errors?.recipient?.lastName && (
                    <p className="-mt-1 text-sm text-red-500">
                      {state.errors.recipient.lastName[0]}
                    </p>
                  )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstName">名(下のお名前)</Label>
                <Input
                  id="firstName"
                  placeholder="太郎"
                  aria-invalid={
                    state.type === "ERROR" &&
                    !!state.errors?.recipient?.firstName
                  }
                  value={person.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
                {state.type === "ERROR" &&
                  state.errors?.recipient?.firstName && (
                    <p className="-mt-1 text-sm text-red-500">
                      {state.errors.recipient.firstName[0]}
                    </p>
                  )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">電話番号</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                placeholder="09012345678"
                aria-invalid={
                  state.type === "ERROR" && !!state.errors?.recipient?.phone
                }
                value={person.phone}
                onChange={(e) =>
                  update("phone", normalizePhoneNumber(e.target.value))
                }
                maxLength={15}
              />
              {state.type === "ERROR" && state.errors?.recipient?.phone ? (
                <p className="-mt-1 text-sm text-red-500">
                  {state.errors.recipient.phone[0]}
                </p>
              ) : (
                <p className="text-muted-foreground -mt-1 text-sm">
                  お相手のお電話番号をご存じでない場合は、代わりにご自身の連絡先を入力してください。
                </p>
              )}
            </div>
          </>
        )}

        {addressFieldDefs.map(({ key, label, defaultHint, handler }) =>
          renderAddressField({
            key,
            label,
            defaultHint,
            handler,
          }),
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>住所を選択してください</DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-2">
            {addressOptions.map((addr, i) => (
              <Button
                key={i}
                variant="outline"
                onClick={() => {
                  updateAddress("prefectureCode", addr.prefectureCode)
                  updateAddress("prefecture", addr.prefecture)
                  updateAddress("city", addr.city)
                  updateAddress("town", addr.town)
                }}
                className="h-fit w-full justify-start text-start whitespace-normal"
              >
                {addr.prefecture} {addr.city} {addr.town}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
