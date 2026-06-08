// OrganicDataViz.jsx
// Requires React 18 + ReactDOM 18 loaded as CDN globals (no Babel needed).
// Load with: <script src="OrganicDataViz.jsx"></script>

const { useRef, useEffect } = React;

// Portfolio colors: #00f3ff (neon-blue) and #b026ff (neon-purple)
const CYAN   = [0, 243, 255];
const PURPLE = [176, 38, 255];

function rnd(a, b)     { return a + Math.random() * (b - a); }
function rndInt(a, b)  { return Math.floor(rnd(a, b)); }
function rgb(c, a)     { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }
function radialGlow(ctx, x, y, r, color, alpha) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgb(color, alpha));
    g.addColorStop(1, rgb(color, 0));
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
}

// ─── Scene 1: Neural Network Pulse ──────────────────────────────────────────

function initNeural(W, H) {
    const count = rndInt(13, 20);
    const nodes = Array.from({ length: count }, () => ({
        x: rnd(35, W - 35),
        y: rnd(35, H - 35),
        vx: rnd(-0.22, 0.22),
        vy: rnd(-0.22, 0.22),
        r: rnd(3, 5.5),
        phase: rnd(0, Math.PI * 2),
        phaseSpd: rnd(0.014, 0.032),
    }));

    const THRESH = W * 0.31;
    const edges = [];
    for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
            if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < THRESH) {
                edges.push({ a: i, b: j, pulses: [], nextPulse: rnd(400, 3000) });
            }
        }
    }
    return { nodes, edges };
}

function drawNeural(ctx, s, dt, mx, my, W, H) {
    const THRESH = W * 0.34;

    s.nodes.forEach(n => {
        n.phase += n.phaseSpd;
        const dx = mx - n.x, dy = my - n.y, d = Math.hypot(dx, dy);
        if (d < 130 && d > 0.1) { n.vx += (dx / d) * 0.014; n.vy += (dy / d) * 0.014; }
        n.vx *= 0.986; n.vy *= 0.986;
        n.x = Math.max(15, Math.min(W - 15, n.x + n.vx));
        n.y = Math.max(15, Math.min(H - 15, n.y + n.vy));
        if (n.x <= 15 || n.x >= W - 15) n.vx *= -1;
        if (n.y <= 15 || n.y >= H - 15) n.vy *= -1;
    });

    s.edges.forEach(e => {
        const a = s.nodes[e.a], b = s.nodes[e.b];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist > THRESH) return;

        const edgeAlpha = (1 - dist / THRESH) * 0.32;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = rgb(CYAN, edgeAlpha);
        ctx.lineWidth = 0.6;
        ctx.stroke();

        e.nextPulse -= dt;
        if (e.nextPulse <= 0) { e.pulses.push({ t: 0, dur: rnd(650, 1300) }); e.nextPulse = rnd(1600, 5500); }

        e.pulses = e.pulses.filter(p => p.t < 1);
        e.pulses.forEach(p => {
            p.t += dt / p.dur;
            const px = a.x + (b.x - a.x) * p.t;
            const py = a.y + (b.y - a.y) * p.t;
            radialGlow(ctx, px, py, 5, CYAN, Math.sin(p.t * Math.PI) * 0.9);
        });
    });

    s.nodes.forEach(n => {
        const pulse = 0.5 + 0.5 * Math.sin(n.phase);
        radialGlow(ctx, n.x, n.y, n.r + pulse * 10, PURPLE, 0.45 + pulse * 0.35);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215,195,255,${0.75 + pulse * 0.25})`;
        ctx.fill();
    });
}

// ─── Scene 2: Data Clustering ────────────────────────────────────────────────

function initClustering(W, H) {
    const k = rndInt(3, 5);
    return {
        k,
        centers: Array.from({ length: k }, (_, i) => ({
            x: rnd(80, W - 80), y: rnd(80, H - 80),
            color: i % 2 === 0 ? CYAN : PURPLE,
        })),
        particles: Array.from({ length: 72 }, () => ({
            x: rnd(0, W), y: rnd(0, H),
            vx: rnd(-1.1, 1.1), vy: rnd(-1.1, 1.1),
            r: rnd(2, 3.8),
            cluster: 0,
            noise: Math.random(),
        })),
        phase: 'forming',
        phaseT: 0,
        formDur: rnd(3800, 5800),
        holdDur: rnd(1800, 3200),
    };
}

function drawClustering(ctx, s, dt, mx, my, W, H) {
    s.phaseT += dt;
    let pull = 0;

    if (s.phase === 'forming') {
        pull = Math.min(s.phaseT / s.formDur, 1) * 0.026;
        if (s.phaseT >= s.formDur) { s.phase = 'holding'; s.phaseT = 0; }
    } else if (s.phase === 'holding') {
        pull = 0.026;
        if (s.phaseT >= s.holdDur) {
            s.phase = 'dissolving';
            s.phaseT = 0;
            s.particles.forEach(p => { p.vx += rnd(-2.8, 2.8); p.vy += rnd(-2.8, 2.8); });
        }
    } else {
        if (s.phaseT >= 1300) {
            s.k = rndInt(3, 5);
            s.centers = Array.from({ length: s.k }, (_, i) => ({
                x: rnd(80, W - 80), y: rnd(80, H - 80),
                color: i % 2 === 0 ? CYAN : PURPLE,
            }));
            s.particles.forEach(p => {
                p.x = rnd(0, W); p.y = rnd(0, H);
                p.vx = rnd(-1.1, 1.1); p.vy = rnd(-1.1, 1.1);
            });
            s.phase = 'forming'; s.phaseT = 0;
            s.formDur = rnd(3800, 5800); s.holdDur = rnd(1800, 3200);
        }
    }

    s.particles.forEach(p => {
        let nearD = Infinity, nearI = 0;
        s.centers.forEach((c, i) => { const d = Math.hypot(c.x - p.x, c.y - p.y); if (d < nearD) { nearD = d; nearI = i; } });
        p.cluster = nearI;
        const c = s.centers[nearI];
        p.vx += (c.x - p.x) * pull * (0.7 + p.noise * 0.6);
        p.vy += (c.y - p.y) * pull * (0.7 + p.noise * 0.6);

        const mdx = p.x - mx, mdy = p.y - my, md = Math.hypot(mdx, mdy);
        if (md < 65 && md > 0.1) { p.vx += (mdx / md) * 0.55 * (1 - md / 65); p.vy += (mdy / md) * 0.55 * (1 - md / 65); }

        p.vx += rnd(-0.035, 0.035); p.vy += rnd(-0.035, 0.035);
        p.vx *= 0.93; p.vy *= 0.93;
        p.x = Math.max(0, Math.min(W, p.x + p.vx));
        p.y = Math.max(0, Math.min(H, p.y + p.vy));
        if (p.x <= 0 || p.x >= W) p.vx *= -1;
        if (p.y <= 0 || p.y >= H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = rgb(s.centers[p.cluster].color, 0.82);
        ctx.fill();
    });

    if (s.phase !== 'dissolving') {
        const prog = s.phase === 'holding' ? 1 : Math.min(s.phaseT / s.formDur, 1);
        s.centers.forEach(c => radialGlow(ctx, c.x, c.y, 40 * prog, c.color, 0.32 * prog));
    }
}

// ─── Scene 3: Signal to Insight ──────────────────────────────────────────────

function initSignal(W, H) {
    return {
        time: 0,
        breathPhase: rnd(0, Math.PI * 2),
        seeds: Array.from({ length: 6 }, () => rnd(0, 1000)),
        cycleSpd: rnd(0.00016, 0.00030),
    };
}

function drawSignal(ctx, s, dt, mx, my, W, H) {
    s.time += dt;
    s.breathPhase += dt * 0.00075;

    const blend = (Math.sin(s.time * s.cycleSpd) + 1) / 2;
    const amp   = 70 + Math.sin(s.breathPhase) * 20;
    const cy    = H / 2;
    const N     = 90;

    const noiseY = [], smoothY = [];
    for (let i = 0; i <= N; i++) {
        const t = i / N;
        const x = t * W;

        let ny = 0;
        for (let h = 0; h < 5; h++) {
            ny += Math.sin(t * 9 * (h + 1) + s.seeds[h] + s.time * 0.001 * (h + 1)) * amp / (h + 1);
        }
        ny += (Math.random() - 0.5) * 7;

        const sy = Math.sin(t * Math.PI * 2.4 + s.time * 0.00038) * amp * 0.52;

        const distMX = Math.abs(x - mx);
        const push   = distMX < 85 ? (1 - distMX / 85) * (my - cy) * 0.38 : 0;

        noiseY.push({ x, y: cy + ny });
        smoothY.push({ x, y: cy + sy + push });
    }

    if (blend < 0.97) {
        ctx.beginPath();
        noiseY.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = `rgba(165,165,205,${(1 - blend) * 0.42})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
        const y = noiseY[i].y * (1 - blend) + smoothY[i].y * blend;
        i === 0 ? ctx.moveTo(noiseY[i].x, y) : ctx.lineTo(noiseY[i].x, y);
    }
    const lg = ctx.createLinearGradient(0, 0, W, 0);
    lg.addColorStop(0,   rgb(PURPLE, 0.4 + blend * 0.55));
    lg.addColorStop(0.5, rgb(CYAN,   0.55 + blend * 0.4));
    lg.addColorStop(1,   rgb(PURPLE, 0.4 + blend * 0.55));
    ctx.strokeStyle = lg;
    ctx.lineWidth = 1.5 + blend * 1.5;
    ctx.stroke();

    if (blend > 0.22) {
        ctx.beginPath();
        smoothY.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = rgb(CYAN, blend * 0.17);
        ctx.lineWidth = 8;
        ctx.stroke();
    }

    const dotAlpha = Math.max(0, blend - 0.52) * 2.1;
    if (dotAlpha > 0) {
        for (let i = 6; i <= N - 6; i += 9) {
            ctx.beginPath();
            ctx.arc(smoothY[i].x, smoothY[i].y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = rgb(CYAN, dotAlpha);
            ctx.fill();
        }
    }

    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(W, cy);
    ctx.strokeStyle = 'rgba(85,85,130,0.25)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
}

// ─── Scene 4: Data Flow ──────────────────────────────────────────────────────

function initDataFlow(W, H) {
    const count = rndInt(9, 14);
    return {
        streams: Array.from({ length: count }, (_, i) => ({
            x: (i / count) * W + rnd(-W / count * 0.28, W / count * 0.28),
            particles: Array.from({ length: rndInt(6, 11) }, () => ({
                y: rnd(-H, H),
                spd: rnd(0.038, 0.115),
                r: rnd(1.4, 3.4),
                isAnomaly: Math.random() < 0.11,
                alpha: rnd(0.28, 0.75),
                wob: rnd(0, Math.PI * 2),
                wobSpd: rnd(0.0008, 0.0022),
                trail: rnd(5, 14),
            })),
        })),
    };
}

function drawDataFlow(ctx, s, dt, mx, my, W, H) {
    s.streams.forEach(stream => {
        stream.particles.forEach(p => {
            p.wob += p.wobSpd * dt;
            const rawX = stream.x + Math.sin(p.wob) * 2.4;

            const dx = rawX - mx, dy = p.y - my, md = Math.hypot(dx, dy);
            const deflect = md < 58 && md > 0.1 ? (dx / md) * (1 - md / 58) * 24 : 0;
            const px = rawX + deflect;

            const trailTop = p.y - p.trail * p.spd * 8;
            const tg = ctx.createLinearGradient(px, trailTop, px, p.y);
            const col = p.isAnomaly ? PURPLE : CYAN;
            tg.addColorStop(0, rgb(col, 0));
            tg.addColorStop(1, rgb(col, p.isAnomaly ? p.alpha : p.alpha * 0.5));
            ctx.beginPath();
            ctx.moveTo(px, trailTop);
            ctx.lineTo(px, p.y);
            ctx.strokeStyle = tg;
            ctx.lineWidth = p.isAnomaly ? 1.5 : 0.8;
            ctx.stroke();

            if (p.isAnomaly) radialGlow(ctx, px, p.y, p.r * 5, PURPLE, p.alpha * 0.45);

            ctx.beginPath();
            ctx.arc(px, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.isAnomaly ? `rgba(205,155,255,${p.alpha})` : rgb(CYAN, p.alpha);
            ctx.fill();

            p.y += p.spd * dt;
            if (p.y > H + 18) {
                p.y = rnd(-45, -8);
                p.isAnomaly = Math.random() < 0.11;
                p.alpha = rnd(0.28, 0.75);
                p.spd = rnd(0.038, 0.115);
            }
        });
    });
}

// ─── Transition engine + component ───────────────────────────────────────────

const SCENE_INITS = [initNeural, initClustering, initSignal, initDataFlow];
const SCENE_DRAWS = [drawNeural, drawClustering, drawSignal, drawDataFlow];

function OrganicDataViz({ width = 500, height = 460 }) {
    const canvasRef = useRef(null);
    const mouseRef  = useRef({ x: width / 2, y: height / 2 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx    = canvas.getContext('2d');
        const mouse  = mouseRef.current;

        let idx      = 0;
        let scene    = SCENE_INITS[0](width, height);
        let opacity  = 0;
        let fadeDir  = 1;   // 1 = fading in, 0 = held, -1 = fading out
        let elapsed  = 0;
        let sceneDur = rnd(6000, 14000);
        let raf, last;

        function tick(ts) {
            if (last === undefined) last = ts;
            const dt = Math.min(ts - last, 50);
            last = ts;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#0d0d1a';
            ctx.fillRect(0, 0, width, height);

            if (fadeDir === 1) {
                opacity = Math.min(1, opacity + dt / 850);
                if (opacity >= 1) { fadeDir = 0; elapsed = 0; }
            } else if (fadeDir === 0) {
                elapsed += dt;
                if (elapsed >= sceneDur) fadeDir = -1;
            } else {
                opacity = Math.max(0, opacity - dt / 850);
                if (opacity <= 0) {
                    idx      = (idx + 1) % SCENE_INITS.length;
                    scene    = SCENE_INITS[idx](width, height);
                    fadeDir  = 1;
                    sceneDur = rnd(6000, 14000);
                }
            }

            ctx.globalAlpha = opacity;
            SCENE_DRAWS[idx](ctx, scene, dt, mouse.x, mouse.y, width, height);
            ctx.globalAlpha = 1;

            raf = requestAnimationFrame(tick);
        }

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [width, height]);

    function handleMouseMove(e) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
        mouseRef.current.x = width / 2;
        mouseRef.current.y = height / 2;
    }

    return React.createElement('canvas', {
        ref: canvasRef,
        width,
        height,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: { display: 'block', borderRadius: '12px', cursor: 'crosshair' },
    });
}

const _mount = document.getElementById('hero-viz');
if (_mount) {
    ReactDOM.createRoot(_mount).render(
        React.createElement(OrganicDataViz, { width: 500, height: 460 })
    );
}
