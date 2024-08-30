import blackArrowLeft from '../../assets/img/arrow-left-circle-black.svg'
import whiteArrowLeft from '../../assets/img/arrow-left-circle-white.svg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../Contexts/Context'

const BackButton = () => {
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <img
        src={theme ? whiteArrowLeft : blackArrowLeft}
        alt=''
        style={{
          width: '32px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
        onClick={e => navigate(-1)}
      ></img>

      <span
        style={{
          height: '40px',
          cursor: 'pointer',
          marginLeft: '5px'
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </span>
    </div>
  )
}

export default BackButton
