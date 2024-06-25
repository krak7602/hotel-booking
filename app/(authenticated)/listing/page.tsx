import HotelList from "@/components/HotelListing"
export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    return (
        <div>
            <HotelList />
        </div>

    )
}
