
import JavaRequest from '@/utils/JavaRequest'
import PhpRequest from '@/utils/PhpRequest'
import store from '@/store'


// 通用文件上传
export function ImageUploading (data,onUploadProgress) {
  var file = new FormData();
  file.append("image", data);
  return PhpRequest({
    url: '/work/ImageUploading',
    method: 'post',
    onUploadProgress,
    timeout: 0,
    data: { file }
  })
}
// 单张图片上传
export function FileImg (data,onUploadProgress) {
  var file = new FormData();
  file.append("image", data);
  return JavaRequest({
    url: '/goods/FileImg',
    method: 'post',
    onUploadProgress,
    timeout: 0,
    data: { file }
  })
}
