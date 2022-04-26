import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Answers} from './Answers'
import {FormattedMessage} from 'react-intl'
import './Report.scss'

export default function Report() {
  const {isSuccess, data} = useSelector((state) => state.diagnostic.result)

  useEffect(() => {
    const elems = document.querySelectorAll('.collapsible')
    window.M.Collapsible.init(elems)
  })

  const collections = Object
    .entries(data)
    .map((item, index) => {
      const [point, {status, message}] = item
      const Answer = Answers[point]

      const colorClass = status ? 'teal-text text-accent-4' : 'red-text text-lighten-1'
      const iconClass = status ? 'far fa-check-square' : 'fas fa-exclamation-circle'

      return (
        <li className={`collection-item ${index === 0 ? 'active' : ''}`} key={index}>
          <div className="collapsible-header">
            <span>{message}</span>
            <i className={`${iconClass} ${colorClass}`}/>
          </div>
          <div className="collapsible-body">
            <Answer data={item[1]}/>
          </div>
        </li>
      )
    })

  return (
    <div className='ts__app-report'>
      <ul className="collapsible">
        <li className="collection-header">
          <h5 className={isSuccess ? 'teal-text text-accent-4' : 'red-text text-lighten-1'}>
            <FormattedMessage
              id="Report.title"
              defaultMessage="Diagnostic result"
            />
          </h5>
        </li>

        {collections}
      </ul>
    </div>
  )
}
