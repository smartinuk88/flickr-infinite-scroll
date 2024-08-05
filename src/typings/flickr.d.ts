export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface Owner {
  id: string;
  username: { _content: string };
  realname: { _content: string };
  location: { _content: string };
  description: { _content: string };
  has_adFree: number;
  has_free_educational_resources: number;
  has_free_standard_shipping: number;
  has_stats: number;
  iconfarm: number;
  iconserver: string;
  is_deleted: number;
  ispro: number;
  mobileurl: { _content: string };
  nsid: string;
  path_alias: string | null;
  photos: {
    count: { _content: number };
    firstdate: { _content: string };
    firstdatetaken: { _content: string };
  };
  photosurl: { _content: string };
  profileurl: { _content: string };
}

export interface PhotoWithOwnerandSizes extends Photo {
  ownerName: string;
  smallImgUrl: string;
  originalImgUrl: string;
}
