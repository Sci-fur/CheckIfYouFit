import Link from 'next/link'
import { DESTINATION_MEDIA } from '@/lib/data'

export default function DestinationCard({ country, onCheck, compact = false }) {
  const media = DESTINATION_MEDIA[country.code] || { landmark: 'Explore this destination', image: '' }
  const action = onCheck ? (
    <button className="destination-card-action" type="button" onClick={onCheck}>Check my fit <span aria-hidden="true">→</span></button>
  ) : (
    <Link className="destination-card-action" href={`/?country=${country.code}#eligibility`}>Check my fit <span aria-hidden="true">→</span></Link>
  )

  return (
    <article className={`destination-card destination-card-photo ${compact ? 'destination-card-compact' : ''}`}>
      <div className="destination-card-image-wrap">
        {media.image ? <img
          className="destination-card-image"
          src={media.image}
          alt={`${media.landmark}, ${country.name}`}
          loading="lazy"
          data-fallback={media.fallback || ''}
          onError={(event) => { const fallback = event.currentTarget.dataset.fallback; if (fallback && event.currentTarget.src !== fallback) { event.currentTarget.src = fallback; event.currentTarget.dataset.fallback = ''; } else { event.currentTarget.style.opacity = '0'; } }}
        /> : null}
        <div className="destination-card-shade" aria-hidden="true" />
        <div className="destination-card-meta">
          <span className="destination-flag" role="img" aria-label={`${country.name} flag`}>{country.flag}</span>
          <span className="destination-code">{country.code}</span>
          <span className="destination-region">{country.region}</span>
        </div>
        <div className="destination-card-copy">
          <h3>{country.name}</h3>
          <span className="destination-landmark">✦ {media.landmark}</span>
          {!compact && <p>{country.hsc}</p>}
          {action}
        </div>
      </div>
    </article>
  )
}
