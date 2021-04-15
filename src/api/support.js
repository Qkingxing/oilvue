import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'

// 帮助中心文章列表
export function getArticles (data) {
  return PhpRequest({
    url: '/article/articllist',
    method: 'post',
    data
  })
}
// 帮助中心文章分类
export function getArticleCategory () {
  return PhpRequest({
    url: '/article/show',
    method: 'post'
  })
}

// 文章详情
export function getArticleDetail (data) {
  return PhpRequest({
    url: '/article/articlcontent',
    method: 'post',
    data
  })
}
