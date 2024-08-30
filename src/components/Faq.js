import React, { useState } from 'react'
import PolkadotPageHeader from './PageHeaders/PolkadotPageHeader'
import FAQ from './FaqData'
import { Pagination } from './Pagination'

const title = 'FAQ'
const description = 'Frequently Asked Questions'
const isValidPage = true

// FAQ for the lowering dapp
export const Faq = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const tabsPerPage = 4
  const indexOfLastQuestion = currentPage * tabsPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - tabsPerPage
  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  }
  if (FAQ) {
    FAQ.forEach((question, index) => {
      question.id = index
    })
  }
  const currentQuestions = FAQ.slice(indexOfFirstQuestion, indexOfLastQuestion)

  return (
    <>
      <PolkadotPageHeader
        title={title}
        description={description}
        isValidPage={isValidPage}
      />
      <div
        className='container-fluid form-container mt-4'
        style={{ marginBottom: '20%' }}
      >
        <div className='accordion' id='faqTabsId'>
          {currentQuestions.map(data => (
            <div className='accordion-item' key={data.id}>
              <h2 className='accordion-header' id='faqTabs'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={`#faqTabs${data.id}`}
                  aria-expanded='false'
                  aria-controls='faqTabs'
                >
                  {data.question}
                </button>
              </h2>
              <div
                id={`faqTabs${data.id}`}
                className='accordion-collapse collapse'
                aria-labelledby='faqTabs'
                data-bs-parent='#faqTabsId'
              >
                <div className='accordion-body'>
                  {data.answer}
                  {data.link ? (
                    <p>
                      <a href={data.link} target='_blank' rel='noreferrer'>
                        Watch Tutorial Here
                      </a>
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          ))}
          <br />
          <Pagination
            tabsPerPage={tabsPerPage}
            totalTabs={FAQ.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  )
}
