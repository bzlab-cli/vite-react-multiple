import './index.scss'

const LayoutFooter = () => {
  const themeConfig = {
    footer: true
  }
  return (
    <>
      {!themeConfig.footer && (
        <div className="footer">
          <a href="http://www.spicyboy.cn/" target="_blank" rel="noreferrer">
            2022 © By Hooks Technology.
          </a>
        </div>
      )}
    </>
  )
}

export default LayoutFooter
