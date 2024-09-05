import { ComponentType, ReactNode, useState } from 'react';

interface ComponentsProps {
    views: number,
    title: string,
    url: string
}

function New(props: {children: ReactNode}) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props: {children: ReactNode}) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function Article(props: {title: string, views: number}) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props: {url: string, views: number}) {
    return (
        <div className="item item-video">
            <iframe src={props.url} allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};


function withCount(Component: ComponentType<ComponentsProps>) {
    return function (props: ComponentsProps) {
        if(props.views >= 1000) {
            return (
                <Popular>
                    <Component {...props}/>
                </Popular>
            )
        }
        if (props.views <= 100) {
            return (
                <New>
                    <Component {...props}/>
                </New>
            )
        }

        return <Component {...props}/>
    }
}

const HOCVideoComponent = withCount(Video);
const HOCArticleComponent = withCount(Article);


function List(props: { list: any[]; }) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <HOCVideoComponent {...item} />
                );

            case 'article':
                return (
                    <HOCArticleComponent {...item} />
                );
        }
    });
};

export default function App() {
    const [list] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}
