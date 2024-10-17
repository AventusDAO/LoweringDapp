import blackArrowLeft from '../../assets/img/arrow-left-circle-black.svg'
import aventusArrowLeft from '../../assets/company_Aventus/icons/left_direction.svg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { stateContext } from '../../Contexts/Context'

const BackButton = () => {
  const navigate = useNavigate()
  const { COMPANY_NAME } = useContext(stateContext)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <img
        src={COMPANY_NAME === 'Aventus' ? aventusArrowLeft : blackArrowLeft}
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
