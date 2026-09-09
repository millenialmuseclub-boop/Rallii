"use client";
import { useState } from "react";
import { CourseVisual } from "@/green/components/course-visual";
import { PartnerWidgetFrame, type PartnerWidgetKind } from "@/green/components/partner-widget-frame";
import type { Course } from "@/green/types/course";

const configured = () => Boolean(process.env.NEXT_PUBLIC_TRAVELPAYOUTS_TRS?.trim() && process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER?.trim());
const services = [
  { kind: "stays", label: "Stays", eyebrow: "Stay near the golf", title: "Find places to stay", copy: "Use the course location as a starting point, then confirm distance and transport independently.", provider: "Agoda" },
  { kind: "flights", label: "Flights", eyebrow: "Get there", title: "Find flights", copy: "Compare flight options separately from the courses you intend to play.", provider: "Trip.com" },
  { kind: "cars", label: "Cars", eyebrow: "Get around", title: "Find cars", copy: "Compare car hire where courses and lodging are dispersed.", provider: "DiscoverCars" },
  { kind: "activities", label: "Beyond golf", eyebrow: "Beyond the course", title: "Explore the destination", copy: "Browse optional activities around the wider golf journey.", provider: "GetYourGuide" },
] as const;

export function GreenPlanningPanel({ courses, initialCourseSlug }: { courses: Course[]; initialCourseSlug?: string }) {
  const initial = courses.find((course) => course.slug === initialCourseSlug) ?? courses[0];
  const [slug, setSlug] = useState(initial.slug);
  const [active, setActive] = useState<PartnerWidgetKind>("stays");
  const course = courses.find((item) => item.slug === slug) ?? initial;
  const service = services.find((item) => item.kind === active) ?? services[0];
  return <section className="partner-plan" aria-labelledby="partner-plan-title">
    <div className="section-heading"><div><p className="eyebrow">Build around your golf</p><h2 id="partner-plan-title">Plan the practical pieces.</h2></div><span>One tool at a time</span></div>
    <label className="partner-plan__route-label" htmlFor="plan-course">Course context</label>
    <select id="plan-course" className="partner-plan__route-select" value={slug} onChange={(event) => setSlug(event.target.value)}>{courses.map((item) => <option key={item.slug} value={item.slug}>{item.name} — {item.location.city}</option>)}</select>
    <div className="planning-course-context"><CourseVisual course={course} compact /><div><span>{course.location.city} · {course.location.region}</span><strong>{course.name}</strong><small>{course.access.publicAccess}</small></div><a href={course.bookingUrl ?? course.sources[0]?.url} target="_blank" rel="noreferrer">Official course source ↗</a></div>
    <div className="partner-service-tabs" role="tablist" aria-label="Travel planning services">{services.map((item) => <button key={item.kind} type="button" role="tab" aria-selected={active === item.kind} onClick={() => setActive(item.kind)}>{item.label}</button>)}</div>
    <section className="partner-service" role="tabpanel"><div><p className="eyebrow">{service.eyebrow}</p><h3>{service.title}</h3><p>{service.copy}</p><small>Partner search by {service.provider} · External booking options.</small></div>{configured() ? <PartnerWidgetFrame key={service.kind} kind={service.kind} title={`${service.provider} partner search`} /> : <div className="partner-plan__quiet"><b>Partner search is unavailable in this environment.</b><span>The verified Preview environment supplies the required configuration.</span></div>}</section>
    <p className="planning-disclosure">Rallii may receive compensation when you use these partner searches. Booking, prices, availability and payment remain with the provider; Rallii does not process reservations.</p>
  </section>;
}
