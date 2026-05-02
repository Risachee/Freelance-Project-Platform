import type { ReactNode, ButtonHTMLAttributes } from 'react'


type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  children?: ReactNode
}

const BackButton = ({
  className = '',
  icon = null,
  children = 'Отмена',
  type = 'button',
  ...props
}: BackButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-white border-2 border-solid hover:bg-gray-100 px-6 py-2 rounded-2xl font-medium flex items-center ${icon ? 'gap-2' : ''} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

export default BackButton