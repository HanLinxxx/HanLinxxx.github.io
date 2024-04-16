const swiperBox = document.querySelector('.swiper-slide:last-of-type .list')
const activeImgs = [...document.querySelectorAll('#active-slider .swiper-slide img')]
const simpleImgs = [...document.querySelectorAll('.Swiper-1 img')]
const activeBox = document.querySelector('#active-slider .swiper-slide:last-of-type .list')
const swiperBox4_3s = [...document.querySelectorAll('.swiper-slide img.building-img')]
const swiperSections = [];
const swiperContainers = [];
const swiperBlanks = [...document.querySelectorAll('.swiper-blank')]

const swiperSliders = [...document.querySelectorAll('.swiper-slider')]
swiperSliders.forEach( swiperSlider => {
	swiperSections.push(swiperSlider.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)
	swiperContainers.push(swiperSlider.parentNode.parentNode.parentNode)
})

var swiper = new Swiper(".Swiper-1", {
	slidesPerView: 1.5,
	spaceBetween: 20,
	breakpoints: {
		376: {
			spaceBetween: 30,
		},
		413: {
			spaceBetween: 30,
		},
		768: {
			slidesPerView: 2.5,
			spaceBetween: 30,

		},
		1024: {
			slidesPerView: 3.5,
			spaceBetween: 60,
		},
		1365: {
			slidesPerView: 4.5,
			spaceBetween: 60,
		},
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	on: {
		resize: function () {
			handler()
		},
	},
});



function handler() {
	const titleImgLeft = document.querySelector('.title-img').getBoundingClientRect().left
	swiperBlanks.forEach(swiperBlank => {
		swiperBlank.style = 'width:' + titleImgLeft + 'px;'
	})
	swiperContainers.forEach( swiperContainer => {
		swiperContainer.style = 'width:calc( 100% - ' + titleImgLeft + 'px);'
	})


	simpleImgs.forEach(simpleImg => {
		simpleImg.style.width = swiperBox.clientWidth + 'px'
		simpleImg.style.height = swiperBox.clientWidth + 'px'
	})
	swiperBox4_3s.forEach(swiperBox4_3 => {
		swiperBox4_3.style.width = swiperBox.clientWidth + 'px'
		swiperBox4_3.style.height = swiperBox.clientWidth * 3 / 4 + 'px'
	})
	activeImgs.forEach(activeImg => {
		activeImg.style.width = activeBox.clientWidth + 'px'
		activeImg.style.height = activeBox.clientWidth + 'px'
	})
}

window.onload = function(){
	handler()
}
// window.addEventListener('resize', handler )

