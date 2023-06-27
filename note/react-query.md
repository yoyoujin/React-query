# React-Query

## React Query는 어떤 문제를 해결할까?

- 리액트 쿼리는 서버 데이터 캐시를 관리한다.
- 리액트 코드에 서버 데이터가 필요할 때 `Fetch` or `Axios`를 사용해 서버로 바도 이동하지 않고, `React Query Cache` 를 요청한다.
- React Query 클라이언트를 어떻게 구성했느냐에 따라 해당 캐시의 데이터를 유지 관리한다.

`React code` ↔️ `React Query cache` ↔️ `Server`

## React Query Manages Data

- 리액트 쿼리는 서버의 데이터를 관리하지만, <br>
  서버의 새 데이터로 캐시를 업데이트하는 시기를 설정하는 것은 사용자의 몫이다.

```
// React Cache
key: 'blog-posts'
data: [
    1: {
        title: 'React Query',
        tagLine: 'What is this thing?'
    },
    2: {
        title: 'React Query Mutations',
        tagLine: 'Not just for ninja turtles'
    }
]
staleTime: 30 seconds
```

- blog-posts라는 키를 할당한 데이터가 캐시되어 있음
- 클라이언트 캐시에 있는 이 데이터가 서버의 데이터와 일치하는지 확인해야하는데 두 가지 방법이 있다.

1. `명령형 imperatively`: invalidate data

- 쿼리 클라이언트에 이 데이터를 무효화하고 캐시에 교체할 새 데이터를 서버에서 가져오게 지시하는 것

2. `선언형 declaratively`: re-fetch를 트리거 하는 조건을 구성하는 것 (ex. 브라우저 창이 다시 포커스 되었을 때)

- staleTime: re-fetch를 언제 트리거할지 구성

## Plus..

- React Query는 데이터 관리 뿐만 아니라, 서버 상태 관리에 도움이 되는 많은 도구가 제공된다.
- 서버에 대한 모든 쿼리의 로딩 및 오류 상태를 유지해주기 때문에 수동으로 처리 해줄 필요가 없어진다.
- 사용자를 위해 데이터의 페이지네이션 or 무한스크롤이 필요한 경우, 데이터를 조각으로 가져올 수 있는 도구도 제공해준다.
- Prefetching 기능
- Mutations: React Query가 서버에서 데이터의 변이나 업데이트를 관리할 수 있음
- De-duplication of requests: 쿼리는 키로 식별되기 때문에 React-Query는 요청을 관리할 수 있고, 페이지를 로드하고 해당 페이지의 여러 구성 요소가 동일한 데이터를 요청하는 경우 한 번에 보낼 수 있다.
  - 기존 쿼리가 나가는 동안 다른 컴포넌트가 데이터를 요청하는 경우 -> 중복 요청을 제거할 수 있다.
- Retry on error: 서버에서 오류가 발생하는 경우에 대한 재시도를 관리할 수 있다. 쿼리가 성공하거나 오류났을 때를 구별하여 조치를 취할 수 있도록 콜백을 전달할 수도 있다.

## Stale Data

리액트 쿼리에서 데이터가 만료되었다는 것은 무슨 뜻일까?

- 데이터 리페칭은 만료된 데이터에서만 실행된다.
- 이 외에도 여러 트리거가 있다.
  (컴포넌트가 다시 마운트되거나 윈도우가 다시 포커스되었을 때 등)
- staleTime은 데이터를 허용하는 'max age'라고 할 수 있다.
- 데이터가 만료됐다고 판단하기 전까지 허용하는 시간인 것이다.

💡 staleTime의 기본값은 왜 0인걸까?

- staleTime이 0이라면 👉 데이터는 항상 만료상태가 된다 👉 서버에서 다시 가져와야한다고 가정함 👉 유저에게 만료된 데이터를 제공할 가능성이 훨씬 줄어들게됨
- '업데이트가 왜 안 돼죠?' 보다 '데이터를 어떻게 늘 최신 상태로 유지하나요'가 훨씬 나은 질문이다.

## staleTime vs. cacheTime

- `staleTime`은 `re-fetching`할때의 고려사항이다.
- `Cache`는 나중에 다시 필요할 수도 있는 데이터용
  - 특정 쿼리에 대한 활성 useQuery가 없는 경우 해당 데이터는 `cold storage`로 이동한다. 구성된 cacheTime이 지나면 캐시의 데이터가 만료되며 유효시간의 기본 값은 5분이다.
  - cacheTime이 관찰하는 시간의 양은 특정 쿼리에 대한 useQuery가 활성화 된 후 경과된 시간이다.
  - 캐시가 만료되면 가비지 컬렉션이 실행되고, 클라이언트는 데이터를 사용할 수 없다.
- 데이터가 Cache에 있는 동안에는 fetching할 때 사용될 수 있다.
