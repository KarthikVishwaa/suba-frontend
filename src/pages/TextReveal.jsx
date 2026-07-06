import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

const ease = [0.16, 1, 0.3, 1]

export default function TextReveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  amount = 0.28,
}) {
  const reduceMotion = useReducedMotion()
  const Tag = motion[as] || motion.div

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag
      className={className}
      initial={{
        opacity: 0.01,
        y: 28,
        filter: 'blur(14px)',
        backgroundPosition: '0% 50%',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        backgroundPosition: '100% 50%',
      }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.8,
        ease,
        delay,
        backgroundPosition: { duration: 1.4, ease },
      }}
    >
      {children}
    </Tag>
  )
}

export { ease as textRevealEase }
