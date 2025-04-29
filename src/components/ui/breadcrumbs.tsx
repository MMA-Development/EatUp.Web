import { Breadcrumb } from '@chakra-ui/react'
import { isMatch, Link, useMatches } from '@tanstack/react-router'

export function Breadcrumbs() {
  const matches = useMatches()

  if (matches.some((match) => match.status === 'pending')) return null

  const matchesWithCrumbs = matches.filter((match) => isMatch(match, 'loaderData.crumb'))

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List gap="4">
        {matchesWithCrumbs.map((match, index) => {
          const isLast = index === matchesWithCrumbs.length - 1
          const label = match.loaderData?.crumb
          const path = match.fullPath

          return (
            <>
              <Breadcrumb.Item>
                {isLast ? (
                  <Breadcrumb.CurrentLink>{label}</Breadcrumb.CurrentLink>
                ) : (
                  <Breadcrumb.Link asChild>
                    <Link to={path}>{label}</Link>
                  </Breadcrumb.Link>
                )}
              </Breadcrumb.Item>
              {!isLast && <Breadcrumb.Separator />}
            </>
          )
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
