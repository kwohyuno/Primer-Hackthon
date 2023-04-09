import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const infoAtom = atomWithStorage('info',{
  language: { name: "영어", value: "english" },
  city: { name: "뉴욕", value: "en-US" },
  category: { name: "카페", value: "cafe" },
});

export const voiceInfoAtom = atom({});

export const messagesAtom = atom([]);

export const isCloseAtom = atom(false);

export const isLikeAtom = atom(true);

export const userLevel = atom('normal'); // basic, normal, hard
