import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from '../types/type'

import { apiBaseUrl } from "../constants";

const getAllDiaries = async () => {
  const { data } = await axios.get<DiaryEntry[]>(
    `${apiBaseUrl}/api/diaries`
  )
  return data;
}

const createDiary = async (entry: NewDiaryEntry): Promise<DiaryEntry> =>{
  const {data} = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/api/diaries`,
    entry
  )
  return data;
}

export default {
  getAllDiaries,
  createDiary
}