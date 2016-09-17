package controllers

import (
	"fmt"
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

type VariantDataSource struct {
	Name   string `json:"name"`
	URL    string `json:"url"`
	Result string `json:"result"`
}

func clinVarFetch(variant string) VariantDataSource {
	vData := VariantDataSource{
		Name: "ClinVar",
	}

	searchLink := fmt.Sprintf("http://www.ncbi.nlm.nih.gov/clinvar/?term=%s", variant)

	doc, err := goquery.NewDocument(searchLink)
	if err != nil {
		return vData
	}

	//determine if page is search
	mainID := doc.Find("#mainrevstatandid")
	if len(mainID.Nodes) > 0 {
		vData.Result = doc.Find(".linkinpagenavtoclinassertab").Text()
		vData.URL = doc.Url.String()
		return vData
	}

	//score each item on page based on how many attribute it shares with rep
	doc.Find(".variant_title").Each(func(idx int, s *goquery.Selection) {
		text, _ := s.Find(".ui-button-text").Html()
		title, exists := s.Attr("title")
		if !exists {
			return
		}

		if strings.Contains(text, "BRCA1") && strings.Contains(text, variant) {
			vData.URL = fmt.Sprintf("http://www.ncbi.nlm.nih.gov/clinvar/variation/%s/", title)
			deepDoc, err := goquery.NewDocument(vData.URL)
			if err != nil {
				return
			}

			vData.Result = deepDoc.Find(".linkinpagenavtoclinassertab").Text()
		}
	})

	return vData
}

func (c App) Index(v string) revel.Result {
	data := []*VariantDataSource{}

	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		vData := clinVarFetch(v)
		data = append(data, &vData)
	}()

	wg.Wait()

	c.Response.Out.Header().Add("Access-Control-Allow-Origin", "*")
	return c.RenderJson(data)
}
