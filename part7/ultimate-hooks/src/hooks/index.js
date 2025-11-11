import { useState } from "react"
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async() => {
    const resp = await axios.get(baseUrl)
    setResources(resp.data)
  }

  const create = async(resource) => {
    const resp = await axios.post(baseUrl, resource)
    setResources([...resources, resp.data])
  }

  const service = {
    getAll,
    create
  }

  return [
    resources, service
  ]
}