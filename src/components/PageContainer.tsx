import { ReactNode, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from './Theme/styled'
import PageBanner from './PageBanner'

function PageContainer({ children }: { children: ReactNode}) {
  const router = useRouter()
  const path = router.pathname
  const pathWithQuery = router.asPath
  const navBarList = useMemo(() => {
    if (path === '/') return ['Home']
    const newPath = path.replace('', 'Home')
    return newPath.split('/')
  }, [path])

  const navbaroption = useMemo(() => {
    const query = pathWithQuery.split('?')[1]
    return {
      Home: {
        name: 'Start',
        path: '/'
      },
      session: {
        name: 'Cluster',
        path: `/session?${query}`
      },
      'cluster-detail': {
        name: 'Cluster Details',
        path: `/session/cluster-detail?${query}`
      },
      summary: {
        name: 'Summary',
        path: `/summary?${query}`
      }
    }
  }, [pathWithQuery])

  return (
    <>
      <PageBanner />
      <PageContentContiner>
        <Flex>
          {navBarList.map((page) => {
            const nav = navbaroption[page as keyof typeof navbaroption];
            if (page === 'Home') {
              if (nav.path === pathWithQuery) return (
                <Flex key={Math.random()}>
                  <ItemContainerActive>
                    {nav.name}
                  </ItemContainerActive>
                </Flex>
              )
              return (
                <Flex key={Math.random()}>
                  <ItemContainer onClick={() => router.push(nav.path)}>
                    {nav.name}
                  </ItemContainer>
                </Flex>
              )
            } else {
              if (nav.path === pathWithQuery) return (
                <Flex key={Math.random()}>
                  <div>{'>'}</div>
                  <ItemContainerActive>
                    {nav.name}
                  </ItemContainerActive>
                </Flex>
              )
              return (
                <Flex key={Math.random()}>
                  <div>{'>'}</div>
                  <ItemContainer onClick={() => router.push(nav.path)}>
                    {nav.name}
                  </ItemContainer>
                </Flex>
              )
            }
          })}
        </Flex>
        {children}
      </PageContentContiner>
    </>
  )
}
const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const ItemContainerActive = styled.div`
  margin: 10px;
  color: 'black';
  font-size: 16px;
  font-weight: 400;
`;

const ItemContainer = styled.div`
  margin: 10px;
  color: blue;
  font-size: 16px;
  font-weight: 400;
  &:hover {
    border-bottom: 1px solid blue;
    cursor: pointer;
  }
`;

const PageContentContiner = styled.div`
  height: 100vh;
  @media only screen and (min-width: 1500px) {
    margin: 0 300px;
  }
`;

export default PageContainer
