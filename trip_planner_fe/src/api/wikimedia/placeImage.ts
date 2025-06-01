export const getPicture = async (placeName: string) => {
  const PLACEHOLDER_IMG = "https://picsum.photos/id/237/200/300"
  try {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      prop: 'imageinfo',
      generator: 'search',
      gsrsearch: placeName,
      gsrnamespace: '6',
      gsrlimit: '1',
      iiprop: 'url',
      origin: '*',
    });

    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`)

    const data = await response.json()
    const pages = data?.query?.pages;
    const firstPage = pages ? Object.values(pages)[0] as any : null;
    const url = firstPage?.imageinfo?.[0]?.url;

    return url || PLACEHOLDER_IMG

  }
  catch (err){
    console.log(err)
    return PLACEHOLDER_IMG
  }

}