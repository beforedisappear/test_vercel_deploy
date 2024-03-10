import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
  searchParams: { cafeType: string };
}

export default async function ServicePage(props: PageProps) {
  const myCookies = cookies().get("some");

  const data =
    await fetch(`https://api-dev.xhalal.ru/api/v2/facilities/search?page=0&type=CAFE&cityId=d049b761-2797-40cf-b595-728876e79fc6${
      props.searchParams.cafeType
        ? `&cafeType=${props.searchParams.cafeType}`
        : ""
    }
  `);

  if (!data.ok) throw new Error(data.statusText);

  const res = await data.json();

  return (
    <>
      <Link href={"?cafeType=CAFE"}>кафе</Link>
      <br />
      <Link href={"?cafeType=FAST_FOOD"}>перекус</Link>
      <br />
      <br />
      <br />

      {res.facilities.map((el: { id: string; title: string }) => (
        <div>{el.title}</div>
      ))}
    </>
  );
}
