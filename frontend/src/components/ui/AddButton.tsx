import type { ReactNode, ButtonHTMLAttributes } from 'react'


type AddButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  children?: ReactNode
}

const AddButton = ({
  className = '',
  icon = null,
  children = 'Новый проект',
  type = 'button',
  ...props
}: AddButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-2xl font-medium flex items-center ${icon ? 'gap-2' : ''} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

export default AddButton