import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FINE, STILL } from '../utils/env'

const ICONS = [
  ['JS', '#f7df1e', '#111'], ['Java', '#e76f00', '#fff'], ['C', '#5c6bc0', '#fff'], ['SQL', '#00758f', '#fff'],
  ['React', '#149eca', '#fff'], ['Node', '#3c873a', '#fff'], ['Express', '#444', '#fff'], ['Mongo', '#47a248', '#fff'],
  ['MySQL', '#00618a', '#fff'], ['Git', '#f05032', '#fff'], ['HTML', '#e34f26', '#fff'], ['CSS', '#1572b6', '#fff'],
  ['TW', '#06b6d4', '#fff'],
]

function makeTexture(t, bg, fg) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const x = c.getContext('2d')
  x.fillStyle = bg
  x.beginPath()
  if (x.roundRect) x.roundRect(4, 4, 120, 120, 24); else x.rect(4, 4, 120, 120)
  x.fill()
  x.fillStyle = fg
  x.font = `700 ${t.length > 4 ? 28 : t.length > 2 ? 38 : 52}px "Space Grotesk",Arial,sans-serif`
  x.textAlign = 'center'
  x.textBaseline = 'middle'
  x.fillText(t, 64, 68)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export default function HeroCanvas({ theme }) {
  const ref = useRef(null)
  const recolorRef = useRef(() => {})

  useEffect(() => {
    const cv = ref.current
    const hero = cv.parentElement
    const R = document.documentElement
    const mobile = innerWidth < 700 || !FINE
    const accent = () => getComputedStyle(R).getPropertyValue('--ac').trim()

    let rn
    try {
      rn = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: !mobile })
    } catch {
      cv.classList.add('hid')
      return
    }
    rn.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1 : 2))

    const sc = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    cam.position.z = 6

    // particles
    const n = mobile ? 250 : 900
    const g = new THREE.BufferGeometry()
    const a = new Float32Array(n * 3)
    for (let i = 0; i < n * 3; i++) a[i] = (Math.random() - 0.5) * 16
    g.setAttribute('position', new THREE.BufferAttribute(a, 3))
    const mat1 = new THREE.PointsMaterial({ size: mobile ? 0.045 : 0.03, transparent: true, opacity: 0.8 })
    const pts = new THREE.Points(g, mat1)
    sc.add(pts)

    // wireframe shapes
    const mat2 = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.35 })
    const gs = [new THREE.IcosahedronGeometry(0.9, 0), new THREE.OctahedronGeometry(0.7), new THREE.TorusGeometry(0.6, 0.18, 8, 18)]
    const shapes = []
    for (let j = 0; j < (mobile ? 2 : 3); j++) {
      const m = new THREE.Mesh(gs[j % 3], mat2)
      m.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 3 - 1)
      m.userData.s = 0.003 + Math.random() * 0.006
      shapes.push(m)
      sc.add(m)
    }

    // floating tech-icon tiles
    const list = mobile ? [0, 1, 4, 5, 7, 9, 11].map((k) => ICONS[k]) : ICONS
    const ig = new THREE.BoxGeometry(0.9, 0.9, 0.14)
    const side = new THREE.MeshBasicMaterial({ color: 0x1b2440 })
    const textures = [], faceMats = [], icons = []
    list.forEach((d, i) => {
      const tex = makeTexture(d[0], d[1], d[2])
      const face = new THREE.MeshBasicMaterial({ map: tex })
      textures.push(tex); faceMats.push(face)
      const o = new THREE.Mesh(ig, [side, side, side, side, face, face])
      o.rotation.x = 0.25
      if (mobile) o.scale.setScalar(0.7)
      o.userData = {
        a: (i / list.length) * 6.283 + 0.4, r: 0.78 + (i % 3) * 0.12, z: -2 + (i % 4) * 0.6,
        s: 0.006 + (i % 5) * 0.002, f: 0.6 + (i % 4) * 0.2,
      }
      icons.push(o)
      sc.add(o)
    })

    const place = () => {
      const hw = 3.2 * cam.aspect, hh = 3
      icons.forEach((o) => {
        const u = o.userData
        o.position.set(Math.cos(u.a) * hw * u.r, 0, u.z)
        u.y = Math.sin(u.a) * hh * u.r
        o.position.y = u.y
      })
    }

    const recolor = () => {
      const c = new THREE.Color(accent())
      mat1.color = c
      mat2.color = c
    }
    recolorRef.current = recolor
    recolor()

    const resize = () => {
      rn.setSize(hero.clientWidth, hero.clientHeight, false)
      cam.aspect = hero.clientWidth / hero.clientHeight
      cam.updateProjectionMatrix()
      place()
    }
    resize()
    addEventListener('resize', resize)

    let mx = 0, my = 0
    const onPointer = (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5 }
    addEventListener('pointermove', onPointer)

    let vis = true
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting })
    io.observe(hero)

    let raf
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!vis) return
      if (!STILL) {
        pts.rotation.y += 0.0008
        shapes.forEach((s) => { s.rotation.x += s.userData.s; s.rotation.y += s.userData.s * 1.3 })
      }
      const tm = performance.now() / 1000
      icons.forEach((o, i) => {
        if (!STILL) {
          o.rotation.y += o.userData.s * 2
          o.position.y = o.userData.y + Math.sin(tm * o.userData.f + i) * 0.18
        }
      })
      cam.position.x += (mx * 1.6 - cam.position.x) * 0.05
      cam.position.y += (-my * 1.0 - cam.position.y) * 0.05
      cam.lookAt(0, 0, 0)
      rn.render(sc, cam)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      removeEventListener('pointermove', onPointer)
      io.disconnect()
      g.dispose(); mat1.dispose(); mat2.dispose(); ig.dispose(); side.dispose()
      gs.forEach((x) => x.dispose())
      faceMats.forEach((x) => x.dispose())
      textures.forEach((x) => x.dispose())
      rn.dispose()
    }
  }, [])

  // re-tint when the theme changes
  useEffect(() => { recolorRef.current() }, [theme])

  return <canvas id="c" ref={ref} aria-hidden="true" />
}
