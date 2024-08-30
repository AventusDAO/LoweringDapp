import { useState, useEffect } from 'react'

const useFetch = endpoint => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await fetch(endpoint)
        if (!res.ok) {
          throw Error('Could not fetch the Lower data, please try again!')
        }
        const resJSON = await res.json()
        setData(resJSON)
        setIsPending(false)
        setError(null)
      }
      getData()
    } catch (err) {
      setIsPending(false)
      setError(err.message)
    }
  }, [endpoint])

  return { data, isPending, error }
}

export default useFetch
