import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {PointTemplates} from './Answers'
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
      return <PointTemplates item={item} index={index} key={index}/>
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
