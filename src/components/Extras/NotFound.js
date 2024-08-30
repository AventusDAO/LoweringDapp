import { Link } from 'react-router-dom'
import PolkadotPageHeader from '../PageHeaders/PolkadotPageHeader'

const title = 'Page Not Found'
const description = "Please check the URL for the page you're trying to access."
const isValidPage = false

export default function NotFound() {
  return (
    <div>
      <PolkadotPageHeader
        title={title}
        description={description}
        isValidPage={isValidPage}
      />
      <div className='container text-center'>
        <div className='not-found'>
          <h2>Sorry</h2>
          <p>That page cannot be found</p>
          <Link to='/'>Back to the Lowering form...</Link>
        </div>
      </div>
    </div>
  )
}
