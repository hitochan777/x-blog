import Header from '../components/header'

export default function Index() {
  return (
    <>
      <Header titlePre="Home" />
      <div style={{ transform: 'translateY(calc(-1 * (64px + 2rem) / 2))' }}>
        <h1 className="myname">hitochan777</h1>
        <div className="explanation">
          Hi😺 My name is hitochan777 and I am a software developer who loves
          React, GraphQL, Python and keen on learning new things.
        </div>
        <div className="social-media" style={{ marginTop: '2rem' }}>
          <a href="https://github.com/hitochan777">GitHub</a>
          <a href="https://qiita.com/hitochan777">Qiita</a>
          <a href="https://zenn.dev/hitochan777">Zenn</a>
        </div>
      </div>
    </>
  )
}
