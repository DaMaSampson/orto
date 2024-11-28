import { ButtonHTMLAttributes } from 'react'

type CustomButtonProps = {
  href?: string
  style?: object
} & ButtonHTMLAttributes<HTMLButtonElement>

const CustomButton = ({ href, style, className, ...rest }: CustomButtonProps) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  // Combine incoming className with default classes
  const mergedClassName = `px-3 py-1 dark:text-gray-100 bg-primary-500 hover:bg-primary-400 ${className || ''}`

  if (isInternalLink) {
    return (
      <button
        style={style}
        className={mergedClassName}
        onClick={() => (window.location.href = href)}
        {...rest}
      />
    )
  }

  if (isAnchorLink) {
    return (
      <button
        style={style}
        className={mergedClassName}
        onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
        {...rest}
      />
    )
  }

  if (href) {
    return (
      <button
        style={style}
        className={mergedClassName}
        onClick={() => window.open(href, '_blank', 'noopener noreferrer')}
        {...rest}
      />
    )
  }

  // Default button behavior if no href is provided
  return <button style={style} className={mergedClassName} {...rest} />
}


export default CustomButton
